from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import pandas as pd
import os

app = FastAPI()

# Serve static files from the frontend directory using an absolute path
frontend_directory = os.path.join(os.path.dirname(__file__), '../frontend')
app.mount("/static", StaticFiles(directory=frontend_directory), name="static")

# Load recipes from CSV using absolute path
recipes_file_path = os.path.join(os.path.dirname(__file__), 'recipes.csv')
recipes_df = pd.read_csv(recipes_file_path)

@app.get("/search")
def search_recipes(ingredients: str):
    ingredient_list = [ingredient.strip() for ingredient in ingredients.split(',')]
    matches = recipes_df[recipes_df['ingredients_keywords'].fillna('').str.contains('|'.join(ingredient_list), case=False)]
    return matches[['name', 'image_url', 'diet', 'description', 'cuisine', 'course', 'prep_time', 'ingredients', 'instructions']].fillna('').to_dict(orient='records')

@app.get("/list")
def list_recipes():
    return recipes_df.fillna('').to_dict(orient='records')

@app.get("/ingredients")
def list_ingredients():
    unique_ingredients = recipes_df['ingredients'].fillna('').unique().tolist()
    return unique_ingredients

@app.get("/", response_class=HTMLResponse)
def read_root():
    # Use absolute path to locate the index.html file
    file_path = os.path.join(os.path.dirname(__file__), '../frontend/index.html')
    with open(file_path) as f:
        return f.read()
