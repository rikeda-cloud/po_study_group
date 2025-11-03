import os
import re

def create_quiz_files(source_dir: str, target_dir: str):
    # 出力ディレクトリが存在しない場合は作成
    os.makedirs(target_dir, exist_ok=True)

    for filename in os.listdir(source_dir):
        source_path = os.path.join(source_dir, filename)
        target_path = os.path.join(target_dir, filename)

        with open(source_path, 'r', encoding="utf-8") as f_in:
            content = f_in.read()

        new_content = re.sub(r'\{[^}]+\}', '[____]', content)

        with open(target_path, 'w', encoding='utf-8') as f_out:
            f_out.write(new_content)

if __name__ == "__main__":
    create_quiz_files("./answer_md/", "./quiz_md/")
