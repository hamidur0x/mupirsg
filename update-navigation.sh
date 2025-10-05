#!/bin/bash

echo "Navigation updating script"
echo "=========================="

# List of pages to update
pages=("index.html" "pages/about.html" "pages/activities.html" "pages/gallery.html" "pages/contact.html" "pages/crew-council.html" "pages/current-crew-council.html" "pages/alsrm.html" "pages/alrm.html")

for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        echo "Updating navigation in: $page"
        # Replace the navigation section with updated one including Crew Council
        sed -i '' 's|<nav>.*</nav>|<nav>\
                <div class="mobile-menu">\
                    <i class="fas fa-bars"></i>\
                </div>\
                <ul>\
                    <li><a href="../index.html">হোম</a></li>\
                    <li><a href="about.html">আমাদের সম্পর্কে</a></li>\
                    <li><a href="activities.html">কার্যক্রম</a></li>\
                    <li><a href="crew-council.html">ক্রু কাউন্সিল</a></li>\
                    <li><a href="gallery.html">গ্যালারি</a></li>\
                    <li><a href="contact.html">যোগাযোগ</a></li>\
                </ul>\
            </nav>|' "$page"
    fi
done

echo "Navigation update complete!"
