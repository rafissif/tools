import streamlit as st
import numpy as np

def get_criteria():
    """
    Get criteria and their weights from the user.
    """
    criteria_input = st.text_input("Enter the criteria (main features you need) separated by commas:")
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
    options = options_input.split(',')
    options = [o.strip() for o in options]
    scores = {option: [] for option in options}

    for criterion in criteria:
        st.write(f"\nScoring options for criterion: {criterion}")
        for option in options:
            score = st.slider(f"Enter the score for {option} on {criterion} (0-10): ", 0.0, 10.0, 5.0)
            scores[option].append(score)

    return options, scores

def calculate_scores(options, scores, weights):
    """
    Calculate weighted scores for each option.
    """
    final_scores = {option: 0 for option in options}
    num_criteria = len(weights)

    for option in options:
        for i in range(num_criteria):
            final_scores[option] += scores[option][i] * weights[i]

    return final_scores

def main():
    st.title("Decision Making App")
    
    # Ask the user for their open-ended question
    question = st.text_input("Write the question in your mind:")

    if question:
        # Get criteria and their weights
        criteria, weights = get_criteria()

        if criteria and weights:
            # Get options and their scores for each criterion
            options, scores = get_options(criteria)

            if options and scores:
                # Calculate weighted scores
                final_scores = calculate_scores(options, scores, weights)

                # Display results
                st.write("\nFinal Scores for each Option:")
                for option, score in final_scores.items():
                    st.write(f"{option}: {score:.2f}")

                # Display the original question
                st.write(f"\nYour Question: {question}")

if __name__ == "__main__":
    main()
