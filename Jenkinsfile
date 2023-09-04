pipeline {
    agent any

    stages {
        stage("Build") {
            steps  {
                sh 'ls'
                sh 'docker -v'
                withCredentials([string(credentialsId: 'DATABASEURL',  variable: 'KEY_1')]) {
                    sh 'export DATABASEURL="khan"'
                    sh '${KEY_1}'
                }
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