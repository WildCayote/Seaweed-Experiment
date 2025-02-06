import requests

url = "http://localhost:8333/newbucket1/s3_config.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=any%2F20250206%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250206T095611Z&X-Amz-Expires=10000&X-Amz-Signature=d3fec78f3e7d33b5e4c32b0dabcbd9027a25f7f86feeaab7b3ddbf2045b9434d&X-Amz-SignedHeaders=host&x-id=PutObject"

with open("s3_config.json", "rb") as file:
    response = requests.put(url, data=file)

if response.status_code == 200:
    print("Upload successful")
else:
    print(f"Upload failed: {response.status_code}, {response.text}")
