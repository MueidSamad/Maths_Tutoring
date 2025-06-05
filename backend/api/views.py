import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Contact


@csrf_exempt
def contact(request):
    if request.method != "POST":
        return JsonResponse({"detail": "Method not allowed"}, status=405)

    try:
        data = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        data = {}

    if not data.get("email"):
        return JsonResponse({"success": False, "error": "Missing email"}, status=400)

    Contact.objects.create(
        name=data.get("name", ""),
        email=data["email"],
        message=data.get("message", ""),
    )

    return JsonResponse({"success": True})
