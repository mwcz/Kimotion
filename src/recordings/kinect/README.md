For future reference, a way to slice existing large kinect recordings into smaller chunks.

bs=number of bytes, 640*480*2*30*number_of_seconds
skip=from the beginning of the file, how many bs's to skip

    dd if=handtracking.bin of=short-handtracking.bin bs=27648000 count=1 skip=7 && gzip short-handtracking.bin
