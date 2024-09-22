from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime
from tasks.models import Task  # Replace 'tasks' with your actual app name

class Command(BaseCommand):
    help = 'Import tasks from a data source'

    def handle(self, *args, **options):
        # Your import logic here
        tasks = [
            Task(
                title="Market Research Survey",
                description="Participate in a survey about market trends and consumer behavior.",
                task_type="survey",
                reward_amount=15.00,
                deadline=timezone.make_aware(datetime.strptime("2024-10-01", "%Y-%m-%d"))
            ),
            Task(
                title="Create a Blog Post",
                description="Write a blog post about the benefits of meditation and mindfulness.",
                task_type="content_creation",
                reward_amount=25.00,
                deadline=timezone.make_aware(datetime.strptime("2024-09-30", "%Y-%m-%d"))
            ),
            Task(
                title="Data Entry for Inventory",
                description="Enter product details into the inventory system.",
                task_type="data_entry",
                reward_amount=10.00,
                deadline=timezone.make_aware(datetime.strptime("2024-09-25", "%Y-%m-%d"))
            ),
            Task(
                title="Test New App Features",
                description="Test the latest features of our mobile app and provide feedback.",
                task_type="testing",
                reward_amount=20.00,
                deadline=timezone.make_aware(datetime.strptime("2024-09-28", "%Y-%m-%d"))
            ),
            Task(
                title="Social Media Micro Job",
                description="Post on social media for our new product launch.",
                task_type="micro_job",
                reward_amount=5.00,
                deadline=timezone.make_aware(datetime.strptime("2024-09-20", "%Y-%m-%d"))
            ),
            Task(
                title="E-Commerce Product Listing",
                description="Create product listings for our online store.",
                task_type="e_commerce",
                reward_amount=30.00,
                deadline=timezone.make_aware(datetime.strptime("2024-09-30", "%Y-%m-%d"))
            ),
            Task(
                title="Fitness Challenge Participation",
                description="Join a fitness challenge and track your progress.",
                task_type="fitness",
                reward_amount=10.00,
                deadline=timezone.make_aware(datetime.strptime("2024-10-15", "%Y-%m-%d"))
            ),
            Task(
                title="Online Course Completion",
                description="Complete an online course on Python programming.",
                task_type="learning",
                reward_amount=40.00,
                deadline=timezone.make_aware(datetime.strptime("2024-10-20", "%Y-%m-%d"))
            )
        ]
        
        # Save tasks to the database
        for task in tasks:
            task.save()

        self.stdout.write(self.style.SUCCESS('Successfully imported tasks'))
