import os
import re
import argparse
import unicodedata

def get_display_width(text: str) -> int:
    """
    全角文字を2、半角文字を1として文字列の表示幅を計算する。
    """
    width = 0
    for char in text:
        if unicodedata.east_asian_width(char) in 'FWA':
            width += 2
        else:
            width += 1
    return width

def extract_answers(dir: str, filename: str, pattern: str) -> list[str]:
    path = os.path.join(dir, filename)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    answers = re.findall(pattern, content)
    return answers


def grade_quizzes(answer_dir: str, quiz_dir: str, show_answers: bool = False):
    print("--- Quiz Grading Results ---")

    for filename in sorted(os.listdir(quiz_dir)):
        correct_answers = extract_answers(answer_dir, filename, r'\{([^}]+)\}')
        user_answers = extract_answers(quiz_dir, filename, r'\[([^\]]+)\]')

        score = 0
        details = []
        for i, (correct, user) in enumerate(zip(correct_answers, user_answers)):
            score += (correct == user)
            mark = "〇" if (correct == user) else "✕"

            TARGET_WIDTH = 25
            padding_width = TARGET_WIDTH - get_display_width(correct)
            if padding_width < 0:
                padding_width = 0
            padding = ' ' * padding_width
            padded_correct = correct + padding
            details.append(f"{i+1:2d}. [{mark}] Correct: {padded_correct} | User: {user}")

        print(f"File: {filename}")
        print(f"Score: {score} / {len(correct_answers)}")

        if show_answers and details:
            [print(detail) for detail in details]

        print("-" * 20)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Grade markdown quiz files.")
    parser.add_argument(
        '-v', '--show-answers',
        action='store_true',
        help="Show correct answers and user answers side-by-side."
    )
    args = parser.parse_args()
    grade_quizzes("./answer_md/", "./quiz_md/", args.show_answers)
