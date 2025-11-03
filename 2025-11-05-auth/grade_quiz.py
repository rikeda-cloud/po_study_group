import os
import re

def grade_quizzes(answer_dir: str, quiz_dir: str):
    print("--- Quiz Grading Results ---")

    for filename in sorted(os.listdir(quiz_dir)):
        quiz_path = os.path.join(quiz_dir, filename)
        answer_path = os.path.join(answer_dir, filename)

        with open(quiz_path, 'r', encoding='utf-8') as f_quiz:
            quiz_content = f_quiz.read()

        with open(answer_path, 'r', encoding='utf-8') as f_answer:
            answer_content = f_answer.read()

        correct_answers = re.findall(r'\{([^}]+)\}', answer_content)
        user_answers = re.findall(r'\[([^\]]+)\]', quiz_content)

        score = sum([correct == user for correct, user in zip(correct_answers, user_answers)])
        
        print(f"File: {filename}")
        print(f"Score: {score} / {len(correct_answers)}")
        print("-" * 20)

if __name__ == "__main__":
    grade_quizzes("./answer_md/", "./quiz_md/")
