#!/bin/bash
# Run an emulator without running Android Studio (https://stackoverflow.com/questions/42718973/run-avd-emulator-without-android-studio)
#1 start chrome for remote debugging
start chrome "http://localhost:8081/debugger-ui/"
#2 start emulator
cd C:/Users/Marcin/AppData/Local/Android/Sdk/platform-tools
./adb reverse tcp:8081 tcp:8081
./adb reverse tcp:5002  tcp:5002