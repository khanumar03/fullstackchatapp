pipeline {
    agent {
        label 'linux-ubuntu'
    }

    stages {
        stage("Build") {
            steps  {
                sh 'ls'
            }
        }

        stage("test") {
            steps {
                echo 'testing'
            }
        }

        stage("Deployment") {
            steps {
                dir ("build") {
                    sh 'ls'
                }
            }
        }
    }
}