from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Livora AI Backend")


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "message": "Livora AI Backend is running!"
    }


@app.post("/api/ai/chat")
def chat(request: ChatRequest):
    question = request.message.strip().lower()

    if "mess" in question or "food" in question:
        reply = "Please check the Mess section for hostel food information."
    elif "complaint" in question:
        reply = "You can use the Complaints section to report a hostel issue."
    elif "roommate" in question or "room" in question:
        reply = "Please check the Room and Roommate sections for details."
    elif "visitor" in question or "guest" in question:
        reply = "Please check the Visitors section for visitor information."
    else:
        reply = (
            "I am Livora's hostel assistant. "
            "You can ask me about mess, rooms, complaints or visitors."
        )

    return {"reply": reply}