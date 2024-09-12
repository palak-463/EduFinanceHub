# Import necessary modules
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure Google Generative AI with API key
api_key = os.getenv("GENERATIVEAI_API_KEY")
genai.configure(api_key=api_key)

# Global variable to maintain chat session
chat = None

# Generation configuration and safety settings
generation_config = {
    "temperature": 0.9,
    "top_p": 0.5,
    "top_k": 5,
    "max_output_tokens": 1000,
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]

# Function to handle text summary requests
def text_summary(text, isNew=False):
    global chat
    
    if isNew or chat is None:  # Start a new chat session
        model = genai.GenerativeModel(
            model_name="gemini-pro",
            generation_config=generation_config,
            safety_settings=safety_settings
        )
        chat = model.start_chat()
        chat.send_message("Act like you are a financial advisor. Provide guidance and information related to financial topics. Dont Generate Bold and Italic Output (*,**) give title in inside <strong> </strong> tag after <strong> </strong> add a <br/> and para text in <p> </p> tag and add 2</br> tag after every title and paragraph  data :  row :- {row},col :-{col}")
    
    # Send message and return response
    response = chat.send_message(text)
    return response.text
