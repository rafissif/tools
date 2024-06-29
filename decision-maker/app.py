def get_criteria():
    """
    Get criteria and their weights from the user.
    """
    criteria = input("Enter the criteria separated by commas: ").split(',')
    criteria = [c.strip() for c in criteria]
    weights = []

    for criterion in criteria:
        while True:
            try:
                weight = float(input(f"Enter the weight for {criterion} (0-1): "))
                if 0 <= weight <= 1:
                    weights.append(weight)
                    break
                else:
                    print("Weight must be between 0 and 1.")
            except ValueError:
                print("Invalid input, please enter a valid number.")

    return criteria, weights

def get_options(criteria):
    """
    Get options and their scores for each criterion from the user.
    """
    options = input("Enter the options separated by commas: ").split(',')
    options = [o.strip() for o in options]
    scores = {option: [] for option in options}

    for criterion in criteria:
        print(f"\nScoring options for criterion: {criterion}")
        for option in options:
            while True:
                try:
                    score = float(input(f"Enter the score for {option} on {criterion} (0-10): "))
                    if 0 <= score <= 10:
                        scores[option].append(score)
                        break
                    else:
                        print("Score must be between 0 and 10.")
                except ValueError:
                    print("Invalid input, please enter a valid number.")

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
    # Ask the user for their open-ended question
    question = input("Write the question in your mind: ")

    # Get criteria and their weights
    criteria, weights = get_criteria()

    # Get options and their scores for each criterion
    options, scores = get_options(criteria)

    # Calculate weighted scores
    final_scores = calculate_scores(options, scores, weights)

    # Display results
    print("\nFinal Scores for each Option:")
    for option, score in final_scores.items():
        print(f"{option}: {score:.2f}")

    # Display the original question
    print(f"\nYour Question: {question}")

if __name__ == "__main__":
    main()

