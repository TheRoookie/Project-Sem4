from django.urls import path
from .views import (
    TaskListView, TaskDetailView, TaskCreateView,
    UserTaskListView, UserTaskCreateView, UserTaskCompleteView,SurveyQuestionsView,SubmitSurveyView,TaskListView,
    EarningsView, TotalEarningsView,
    TransactionListView, TransactionCreateView,WithdrawView
)

urlpatterns = [
    # ... (other URL patterns)
    path('earnings/', EarningsView.as_view(), name='earnings'),
    path('total-earnings/', TotalEarningsView.as_view(), name='total-earnings'),
    path('withdraw/', WithdrawView.as_view(), name='withdraw'),
    path('survey-questions/<int:task_id>/', SurveyQuestionsView.as_view()),
    path('submit-survey/', SubmitSurveyView.as_view()),
    path('tasks/', TaskListView.as_view()),
    # ... (other URL patterns)
]