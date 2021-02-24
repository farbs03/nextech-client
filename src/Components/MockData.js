export const userData = {
    "name": "McRib",
    "friends": ["id1", "id2"],
    "stats": {
        "happiness": 4,
        "overtime": 120,
        "pushedToNextDay": 4,
        "activeDays": 10
    },
    "lifeTasks": [
        {
            "name": "School",
            "time": ["8:00am", "2:00pm"],
            "due": "School do be school",
            "description": "this is a description"
        }
    ],
    "workTasks": [
        {
            "name": "Math HW",
            "duration": 60,
            "due": "2021-02-09",
            "description": "this is a description",
            "tag": "School"
        },
        {
            "name": "Emails",
            "duration": 30,
            "due": "2021-02-09",
            "description": "this is a description",
            "tag": "Life"
        }, 
        {
            "name": "IDK",
            "duration": 45,
            "due": "2021-02-09",
            "description": "this is a description",
            "tag": "Work"
        }
    ],
    "days": [
        {
            "date": "2021-02-15",
            "lifeTasks": [
                {
                    "name": "School",
                    "time": ["8:00am", "2:00pm"],
                    "due": "2021-02-09",
                    "description": "this is a description",
                    "status": 1
                }
            ],
            "workTasks": [
                {
                    "name": "IDK",
                    "duration": 45,
                    "due": "2021-02-09",
                    "description": "this is a description",
                    "status": -1
                },
                {
                    "name": "IDK",
                    "duration": 45,
                    "due": "2021-02-09",
                    "description": "this is a description",
                    "status": 1
                }
            ]
        }
    ]
}