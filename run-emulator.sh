#!/bin/bash
# Run an emulator without running Android Studio (https://stackoverflow.com/questions/42718973/run-avd-emulator-without-android-studio)
#1 start chrome for remote debugging
start chrome "http://localhost:8081/debugger-ui/"
#2 start emulator
cd C:/Users/Marcin/AppData/Local/Android/Sdk/tools
./emulator -avd Nexus_5X_API_26 -feature WindowsHypervisorPlatform