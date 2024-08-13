BASE_URL="http://localhost:3000"

SCHEDULE_ID=$(curl -s -X POST ${BASE_URL}/schedules \
  -H "Content-Type: application/json" \
  -d '{"accountId": 1, "agentId": 1, "startTime": "2024-08-11T09:00:00Z", "endTime": "2024-08-11T17:00:00Z"}' \
  | jq -r '.id')

curl -s -X GET ${BASE_URL}/schedules | jq

curl -s -X GET ${BASE_URL}/schedules/${SCHEDULE_ID} | jq

curl -s -X PATCH ${BASE_URL}/schedules/${SCHEDULE_ID} \
  -H "Content-Type: application/json" \
  -d '{"endTime": "2024-08-11T18:00:00Z"}' | jq

curl -s -X DELETE ${BASE_URL}/schedules/${SCHEDULE_ID} | jq

RESPONSE=$(curl -s -X POST ${BASE_URL}/tasks \
  -H "Content-Type: application/json" \
  -d '{"accountId": 1, "scheduleId": "'${SCHEDULE_ID}'", "startTime": "2024-08-11T10:00:00Z", "duration": 60, "type": "work"}')

TASK_ID=$(echo $RESPONSE | jq -r '.id')
curl -s -X GET ${BASE_URL}/tasks | jq

curl -s -X GET ${BASE_URL}/tasks/${TASK_ID} | jq

curl -s -X PATCH ${BASE_URL}/tasks/${TASK_ID} \
  -H "Content-Type: application/json" \
  -d '{"duration": 90}' | jq

curl -s -X DELETE ${BASE_URL}/tasks/${TASK_ID} | jq