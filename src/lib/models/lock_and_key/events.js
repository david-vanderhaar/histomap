export default [
  {
    "name": "NOTHING",
    // "description": "Nothing significant happened for ::ACTOR::.",
    "description": "",
    "effects": [],
  },
  {
    "name": "MIGRATE",
    "description": "The tribal people of ::ACTOR:: came upon the region known as ::RANDOM_PLACE::.",
    "effects": [
      {
        "type": "changeStatByRandomRange",
        "stat": "economicPower",
        "value": ["-2", "2"]
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
        "value": -1
      },
      {
        "type": "changeStatBy",
        "stat": "economicPower",
        "value": 2
      },
      {
        "type": "changeStatBy",
        "stat": "level",
        "value": 1,
        "conditions": [
          {
            "type": "statBetween",
            "stat": "level",
            "value": ["1", "4"]
          }
        ]
      },
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
        "stat": "militartPower",
        "value": 1
      },
      {
        "type": "changeStatBy",
        "stat": "level",
        "value": 1,
      },
    ],
    "conditions": [
      {
        "type": "statBetween",
        "stat": "level",
        "value": ["1", "3"]
      }
    ]
  },
  {
    "name": "ESTABLISH_TRADE_ROUTE",
    "description": "::ACTOR:: established a new trade route.",
    "effects": [
      {
        "type": "changeStatBy",
        "stat": "economicPower",
        "value": 1
      },
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
    "name": "ESTABLISH_MILITARY_STRONG_POINT",
    "description": "::ACTOR:: established a new military strong point.",
    "effects": [
      {
        "type": "changeStatBy",
        "stat": "militaryPower",
        "value": 1
      },
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
    "name": "FAILED_REVOLT",
    "description": "The people of ::ACTOR:: revolted against their leaders, but were squashed in their attempt",
    "effects": [
      {
        "type": "changeStatBy",
        "stat": "militaryPower",
        "value": -1
      },
      {
        "type": "changeStatBy",
        "stat": "economicPower",
        "value": -1
      }
    ],
    "conditions": [
      {
        "type": "statBetween",
        "stat": "level",
        "value": ["3", "5"]
      }
    ]
  },
  {
    "name": "SUCCESSFUL_REVOLT",
    "description": "The people of ::ACTOR:: revolted against their leaders. ::ACTOR:: is in ruins.",
    "effects": [
      {
        "type": "setStatTo",
        "stat": "militaryPower",
        "value": 0
      },
      {
        "type": "setStatTo",
        "stat": "economicPower",
        "value": 0
      },
      {
        "type": "setStatTo",
        "stat": "level",
        "value": -1
      },
    ],
    "conditions": [
      {
        "type": "statBetween",
        "stat": "level",
        "value": ["4", "5"]
      }
    ]
  },
]