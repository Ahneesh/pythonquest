# CodeQuest Lesson Audio Reader

The lesson reader uses the browser Web Speech API.

Features:

- male or female voice preference
- specific installed voice selection
- playback speed from 0.5x to 2.0x
- play, pause, resume and stop
- reads the active textbook section
- saved voice and speed preferences
- automatic stopping when changing section or view

Browsers do not expose a reliable voice-gender field. CodeQuest uses curated voice-name matching
to choose the closest installed English voice for the selected preference. The learner may also
choose any specific voice exposed by the browser or device.
