FROM ubuntu:20.04

# Cài đặt các gói phụ thuộc
RUN apt-get update && apt-get install -y \
    curl \
    tmux \
    vim \
    gnupg2 \
    gnupg

# Cài đặt Node.js và npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Cài đặt MongoDB
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
RUN apt-get update

# Nhập khóa công khai MongoDB
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv B00A0BD1E2C63C11

# Xác minh chữ ký của kho lưu trữ MongoDB
RUN apt-get update && apt-get install -y apt-transport-https
RUN apt-get update

# Cài đặt MongoDB
RUN apt-get install -y mongodb-org
RUN mongod --fork --logpath /var/log/mongodb.log --config /etc/mongod.conf


# Cài đặt yarn
RUN npm install -g yarn

# Sao chép thư mục chứa mã nguồn
COPY . /genieacs-customization
WORKDIR /genieacs-customization

# Cài đặt các gói phụ thuộc và build
RUN yarn install
RUN yarn run build

# Chạy các lệnh còn lại
WORKDIR /genieacs-customization/dist/bin

RUN touch genieacs-start.sh \
    && chmod 777 genieacs-start.sh \
    && echo '#!/bin/sh' >> ./genieacs-start.sh \
    && echo 'tmux new-session -s "genieacs" -d' >> ./genieacs-start.sh \
    && echo 'tmux send-keys "./genieacs-cwmp" "C-m"' >> ./genieacs-start.sh \
    && echo 'tmux split-window' >> ./genieacs-start.sh \
    && echo 'tmux send-keys "./genieacs-nbi" "C-m"' >> ./genieacs-start.sh \
    && echo 'tmux split-window' >> ./genieacs-start.sh \
    && echo 'tmux send-keys "./genieacs-fs" "C-m"' >> ./genieacs-start.sh \
    && echo 'tmux split-window' >> ./genieacs-start.sh \
    && echo 'tmux send-keys "./genieacs-ui --ui-jwt-secret changeme" "C-m"' >> ./genieacs-start.sh \
    && echo 'tmux select-layout tiled 2>/dev/null' >> ./genieacs-start.sh \
    && echo 'tmux rename-window "GenieACS"' >> ./genieacs-start.sh \
    && echo 'echo "GenieACS has been started in tmux session 'geneiacs'"' >> ./genieacs-start.sh \
    && echo 'echo "To attach to session, use: tmux attach -t genieacs"' >> ./genieacs-start.sh \
    && echo 'echo "To switch between panes use Ctrl+B-ArrowKey"' >> ./genieacs-start.sh \
    && echo 'echo "To deattach, press Ctrl+B-D"' >> ./genieacs-start.sh \
    && echo 'echo "To stop GenieACS, use: ./genieacs-stop.sh"' >> ./genieacs-start.sh

# Cài đặt Angular CLI và các gói phụ thuộc cho ứng dụng admin-app
WORKDIR /genieacs-customization/genie-acs-admin-app
RUN yarn global add @angular/cli@14.0.6
RUN yarn install

# Mở các cổng cần thiết
EXPOSE 7547 7548 3000 4200 27017

# Chạy các lệnh khi container được khởi động
CMD ["/bin/bash", "-c", "mongod --fork --config /etc/mongod.conf & cd /genieacs-customization/dist/bin && ./genieacs-start.sh & cd /genieacs-customization/genie-acs-admin-app && yarn start"]
