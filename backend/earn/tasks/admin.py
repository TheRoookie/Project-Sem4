from django.contrib import admin
from .models import Task,UserTask,Earnings,Transaction,SurveyResponse,SurveyQuestion,SurveyOption
# Register your models here.
admin.site.register(Task)
admin.site.register(Transaction)
admin.site.register(Earnings)
admin.site.register(UserTask)
admin.site.register(SurveyQuestion)
admin.site.register(SurveyResponse)
admin.site.register(SurveyOption)

