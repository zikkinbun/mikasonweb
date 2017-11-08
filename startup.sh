#!/bin/bash

node_pid=./node_project.pid

if [[ $# -ne 1 ]]; then
	echo "Usage: `basename $0` |init|start|stop|retart|"
fi

function install() {

  nohup cnpm install >/dev/null &

  install_pid=$!

  wait $install_pid

	nohup node app.js >/dev/null &

	echo $! > node_project.pid

}

function start() {
  if [ -f $node_pid ]; then
    if kill -0 `cat $node_pid` > /dev/null 2>&1; then
      echo running as process `cat $node_pid`
      exit 1
    fi
  fi

  nohup node app.js >/dev/null &

  echo $! > node_project.pid

}

function stop() {
  if [ -f $node_pid ]; then
    if kill -9 `cat $node_pid` > /dev/null 2>&1; then
      echo stopping
      kill `cat $node_pid`
    else
      echo no to stop
    fi
  else
    echo no to stop
  fi
}

case $1 in
  start )
    start
    ;;
  stop )
    stop
    ;;
  restart )
    stop
    sleep 1
    start
    ;;
  init )
    stop
    sleep 1
    install
    ;;
esac
