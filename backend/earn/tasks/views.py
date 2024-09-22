from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task, UserTask, Earnings, Transaction
from .serializers import TaskSerializer, UserTaskSerializer, EarningsSerializer, TransactionSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum

# View to list all tasks
class TaskListView(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

# View to get a single task detail
class TaskDetailView(APIView):
    def get(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

# View to create a new task
class TaskCreateView(APIView):
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserTaskListView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_tasks = UserTask.objects.filter(user=request.user)
        serializer = UserTaskSerializer(user_tasks, many=True)
        return Response(serializer.data)

class UserTaskCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = UserTaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserTaskCompleteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user_task = get_object_or_404(UserTask, pk=pk, user=request.user)
        user_task.is_completed = True
        user_task.completed_at = timezone.now()
        user_task.reward_earned = True
        user_task.save()

        # Update earnings for the user
        user_earnings, created = Earnings.objects.get_or_create(user=request.user)
        user_earnings.total_earned += user_task.task.reward_amount
        user_earnings.save()

        return Response({'message': 'Task marked as completed.'}, status=status.HTTP_200_OK)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Earnings
from decimal import Decimal

class WithdrawView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        amount = Decimal(request.data.get('amount', 0))

        try:
            earnings = Earnings.objects.get(user=user)
            if amount <= 0 or amount > earnings.total_earned:
                return Response({"error": "Invalid withdrawal amount"}, status=status.HTTP_400_BAD_REQUEST)

            earnings.total_earned -= amount
            earnings.save()

            # Here you would typically process the actual withdrawal
            # (e.g., initiate a bank transfer, update transaction history, etc.)

            return Response({"total_earned": earnings.total_earned})
        except Earnings.DoesNotExist:
            return Response({"error": "Earnings record not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EarningsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data.get('userid') or request.user.id
        earnings, created = Earnings.objects.get_or_create(user=user_id)
        serializer = EarningsSerializer(earnings)
        return Response(serializer.data)

class TotalEarningsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_earnings = UserTask.objects.filter(
            user=request.user, 
            is_completed=True, 
            reward_earned=True
        ).aggregate(
            total=Sum('task__reward_amount')
        )['total'] or 0

        return Response({
            'total_earnings': total_earnings
        })



class TransactionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        transactions = Transaction.objects.filter(user=request.user)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

class TransactionCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = TransactionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.http import JsonResponse
from django.views import View
from .models import Task, SurveyQuestion, SurveyResponse
from django.core.serializers import serialize
import json

class TaskListView(View):
    def get(self, request):
        tasks = Task.objects.filter(task_type='survey')
        data = serialize('json', tasks)
        return JsonResponse(data, safe=False)

class SurveyQuestionsView(View):
    def get(self, request, task_id):
        questions = SurveyQuestion.objects.filter(task_id=task_id)
        data = serialize('json', questions)
        return JsonResponse(data, safe=False)

class SubmitSurveyView(View):
    def post(self, request):
        data = json.loads(request.body)
        task_id = data.get('task_id')
        user = request.user
        
        for response in data.get('responses', []):
            question_id = response.get('question_id')
            answer_text = response.get('answer_text')
            rating = response.get('rating')
            selected_options = response.get('selected_options', [])
            
            survey_response = SurveyResponse.objects.create(
                user=user,
                task_id=task_id,
                question_id=question_id,
                answer_text=answer_text,
                rating=rating
            )
            
            if selected_options:
                survey_response.selected_options.set(selected_options)
        
        return JsonResponse({'status': 'success'})