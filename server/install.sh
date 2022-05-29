npm install
sudo cp ./chatmaps.service /etc/systemd/system/chatmaps.service
sudo systemctl daemon-reload
sudo systemctl enable chatmaps
sudo systemctl restart chatmaps
