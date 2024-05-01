import pandas as pd
import json

# JSON 파일을 로드합니다
def load_json(j_file):
    with open(j_file, 'r', encoding='utf-8') as file:
        return json.load(file)

# JSON 데이터를 DataFrame으로 변환하고 Excel 파일로 저장합니다
def json_to_excel(j_data, e_file):
    # JSON 데이터를 DataFrame으로 변환 (키와 값 각각을 열로)
    df = pd.DataFrame(list(j_data.items()), columns=['Term', 'Description'])

    # Excel 파일로 저장
    df.to_excel(e_file, index=False, engine='openpyxl')

# 사용 예제
if __name__ == "__main__":
    json_file = 'data/.json'  # JSON 파일 경로
    excel_file = 'data/.xlsx'  # 생성될 Excel 파일 경로

    # JSON 파일 로드
    json_data = load_json(json_file)
    
    # JSON 데이터를 Excel로 변환
    json_to_excel(json_data, excel_file)
    print(f'Excel 파일이 저장되었습니다: {excel_file}')
