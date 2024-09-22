from django.db import models
from django.conf import settings
# Create your models here.
class Task(models.Model):
    TASK_TYPES = [
        ('survey', 'Survey'),
        ('content_creation', 'Content Creation'),
        ('data_entry', 'Data Entry'),
        ('testing', 'Testing'),
        ('micro_job', 'Micro Job'),
        ('e_commerce', 'E-Commerce'),
        ('fitness', 'Fitness'),
        ('learning', 'Learning'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    task_type = models.CharField(max_length=50, choices=TASK_TYPES)
    reward_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return self.title



class UserTask(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    reward_earned = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.user.name} - {self.task.title}'
    
class Earnings(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total_earned = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    last_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.user.name} - Total Earned: {self.total_earned}'


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('withdrawal', 'Withdrawal'),
        ('deposit', 'Deposit'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='pending')
    
    def __str__(self):
        return f'{self.user.name} - {self.transaction_type}: {self.amount}'



class SurveyQuestion(models.Model):
    QUESTION_TYPES = [
        ('text', 'Text'),
        ('multiple_choice', 'Multiple Choice'),
        ('checkbox', 'Checkbox'),
        ('rating', 'Rating'),
    ]

    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    required = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.task.title} - {self.question_text[:50]}"

class SurveyOption(models.Model):
    question = models.ForeignKey(SurveyQuestion, on_delete=models.CASCADE, related_name='options')
    option_text = models.CharField(max_length=255)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.question.question_text[:30]} - {self.option_text}"

class SurveyResponse(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    question = models.ForeignKey(SurveyQuestion, on_delete=models.CASCADE)
    answer_text = models.TextField(blank=True, null=True)
    selected_options = models.ManyToManyField(SurveyOption, blank=True)
    rating = models.IntegerField(null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.task.title} - {self.question.question_text[:30]}"