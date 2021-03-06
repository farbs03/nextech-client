export const userData = {
    "name": "Not Logged In",
    "friends": ["id1", "id2"],
    "stats": {
        "overtime": 120,
        "pushedToNextDay": 4,
        "activeDays": 10,
        "days": [
            {
                "Date": "2021-02-09",
                "Work": 1,
                "School": 1,
                "Life": 1,
                "Exercise": 0,
                "Happiness": 5,
            },
        ],
        "length": 0
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
    ],
    "selectedNote": 0,
    "notes": [
        {
            "name": "Untitled",
            "content": "Write your notes here!"
        },
        {
            "name": "Banana Smoothie Recipe",
            "content": "You Will Need:\n\n   1 banana\n    1/2 orange, peeled and quartered\n    1/3 cup Greek yogurt\n    1/4 cup water or milk (dairy or non-dairy)\n    1 to 2 teaspoons honey, optional\n\n----\nDirections:\n\n    Roughly chop banana and orange quarters then add to a blender. Top with yogurt and the water (or milk). Turn blender on and blend until creamy and smooth. Taste then adjust with honey if needed.\n"
        },
        {
            "name": "Workout Routine",
            "content": "Chest – Barbell Bench Press – 4 sets of 8 reps\n\nBack – Lat-pulldowns – 4 sets of 10 reps\n\nShoulders – Seated Dumbbell Press – 4 sets of 10 reps\n\nLegs – Leg Extensions – 4 sets of 10 reps\n\nBiceps – Barbell Bbicep Curls – 3 sets of 10 reps\n\nTriceps – Triceps Rope Pushdowns – 3 sets of 15 reps\n"
        }
    ]
}