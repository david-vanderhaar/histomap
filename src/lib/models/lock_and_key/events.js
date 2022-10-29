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
  {
    "name": "COLONIZE",
    "description": "::ACTOR:: established colonies throughout ::RANDOM_PLACE::.",
    "effects": [
      {
        "type": "changeStatBy",
        "stat": "militaryPower",
        "value": 1
      },
      {
        "type": "changeStatBy",
        "stat": "economicPower",
        "value": 1
      }
    ],
    "conditions": [
      {
        "type": "statBetween",
        "stat": "level",
        "value": ["4", "5"]
      }
    ]
  },
  {
    "name": "ESTABLISH_CITY",
    "description": "::ACTOR:: founded a city.",
    "effects": [
      {
        "type": "changeStatBy",
        "stat": "economicPower",
        "value": 1
      },
      {
        "type": "changeStatBy",
        "stat": "level",
        "value": 1,
        "conditions": [
          {
            "type": "statEquals",
            "stat": "level",
            "value": 2
          }
        ]
      }
    ],
    "conditions": [
      {
        "type": "statBetween",
        "stat": "level",
        "value": ["2", "5"]
      }
    ]
  },
  {
    "name": "REVOLT",
    "description": "The people of ::ACTOR:: revolted against their leaders.",
    "effects": [
      {
        "type": "changeStatBy",
        "stat": "militaryPower",
        "value": -2
      },
      {
        "type": "changeStatBy",
        "stat": "economicPower",
        "value": -2
      }
    ],
    "conditions": [
      {
        "type": "statBetween",
        "stat": "level",
        "value": ["2", "5"]
      }
    ]
  },
]