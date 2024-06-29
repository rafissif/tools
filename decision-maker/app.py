import streamlit as st
import numpy as np

def get_criteria():
    """
    Get criteria and their weights from the user.
    """
    criteria_input = st.text_input("Enter the criteria separated by commas:")
    criteria = criteria_input.split(',')
    criteria = [c.strip() for c in criteria]
    weights = []

    for criterion in criteria:
        weight = st.slider(f"Enter the weight for {criterion} (0-1): ", 0.0, 1.0, 0.5)
        weights.append(weight)

    return criteria, weights

def get_options(criteria):
    """
    Get options and their scores for each criterion from the user.
    """
    options_input = st.text_input("Enter the options separated by commas:")
    options = 
