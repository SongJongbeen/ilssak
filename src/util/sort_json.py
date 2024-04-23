import json

def sort_json_keys(input_file_path, output_file_path):
    # JSON 파일을 읽기
    with open(input_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    # 딕셔너리 키를 한글 가나다 순으로 정렬
    sorted_data = dict(sorted(data.items(), key=lambda item: item[0]))
    
    # 정렬된 데이터를 새로운 JSON 파일로 저장
    with open(output_file_path, 'w', encoding='utf-8') as file:
        json.dump(sorted_data, file, ensure_ascii=False, indent=4)

# 사용 예
sort_json_keys('data/bamboo-road.json', 'data/bamboo-road.json')

print('done')
