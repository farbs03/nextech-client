const data = {
    "name": "McRib",
    "friends": ["id1", "id2"],
    "stats": {
        "happiness": 4,
        "overtime": 120,
        "pushedToNextDay": 4,
        "activeDays": 10
    },
    "lifeTasks": [

    ],
    "workTasks": [
        {
            "id": "1",
            "name": "Math HW",
            "duration": 60,
            "due": "Due at 11:59pm"
        },
        {
            "id": "2",
            "name": "Emails",
            "duration": 30,
            "due": "Due at 11:59pm"
        }, 
        {
            "id": "3",
            "name": "IDK",
            "duration": 45,
            "due": "Due at 11:59pm"
        }
    ],
    "days": [
        {
            "lifeTasks": [
                {"id": 1, "status": 0}
            ],
            "workTasks": [
                {"id": 1, "status": 1},
                {"id": 2, "status": 1}
            ]
        },
        {
            "lifeTasks": [
                {"id": 1, "status": 0}
            ],
            "workTasks": [
                {"id": 1, "status": 1},
                {"id": 2, "status": 1}
            ]
        }
    ]
}

export default data