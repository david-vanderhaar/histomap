export default [
  {
    "name": "NOTHING",
    "description": "Nothing significant happened for ::ACTOR::.",
    "effects": [],
  },
  {
    "name": "MIGRATE",
    "description": "The tribal people of ::ACTOR:: came upon the region known as ::RANDOM_PLACE::.",
    "effects": [
      {
        "type": "changeStatByRandomRange",
        "stat": "economicPower",
        "value": ["-5", "5"]
      }
    ],
    "conditions": [
      {
        "type": "statBetween",
        "stat": "level",
        "value": ["1", "2"]
      }
    ]
  },
]