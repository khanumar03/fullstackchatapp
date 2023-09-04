pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable:'dockerHubPass', usernameVariable:'dockerHubUser')]) {
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                }
                sh 'ls'
                sh 'docker-compose --verbose build'
                sh 'docker images'
                sh 'docker tag webapp_appclient khanumar03/webappdeployment:client-v1'
                sh 'docker tag webapp_appserver khanumar03/webappdeployment:server-v1'
                sh 'docker tag webapp_nginx khanumar03/webappdeployment:nginx-v1'
                sh 'docker push khanumar03/webappdeployment:client-v1'
                sh 'docker push khanumar03/webappdeployment:server-v1'
                sh 'docker push khanumar03/webappdeployment:nginx-v1'
            }
        }

        stage('test') {
            steps {
                echo 'testing'
            }
        }

        stage('Deployment') {
            steps {
                sh 'docker network create webApp'
                dir('build') {
                    withCredentials([string(credentialsId: 'DATABASEURL', variable: 'D_KEY'), string(credentialsId: 'CLERK_KEY', variable: 'C_KEY')]) {
                        sh "export DATABASEURL=${D_KEY}"
                        sh "export CLERKKEY=${C_KEY}"
                        sh 'docker-compose up'
                    }
                }
            }
        }
    }
}
