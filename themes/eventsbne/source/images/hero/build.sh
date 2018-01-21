#!/bin/bash
rm *.jpg *.webp
convert source/southbank-beach.png -quality 60 southbank-beach.jpg
convert source/southbank-beach.png -quality 30 southbank-beach.webp
convert source/southbank-beach-1920.png -quality 60 southbank-beach-1920.jpg
convert source/southbank-beach-1920.png -quality 30 southbank-beach-1920.webp
convert source/southbank-beach-1366.png -quality 60 southbank-beach-1366.jpg
convert source/southbank-beach-1366.png -quality 60 southbank-beach-1366.jpg
convert source/southbank-beach-600.png -quality 60 southbank-beach-600.jpg
convert source/southbank-beach-600.png -quality 30 southbank-beach-600.webp
