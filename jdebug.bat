
if "$1" == "" goto BAD_EXIT


node-debug /c/Users/Christopher/AppData/Roaming/npm/node_modules/jasmine/bin/jasmine.js ./spec/typeCodeSpec.js

goto GOOD_EXIT

BAD_EXIT:
  echo missing spec to debug.

GOOD_EXIT:
  echo thanks for playing.
