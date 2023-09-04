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
            }
        }

        stage('Pushing-images') {
            steps {
                sh 'docker push khanumar03/webappdeployment:client-v1'
                sh 'docker push khanumar03/webappdeployment:server-v1'
                sh 'docker push khanumar03/webappdeployment:nginx-v1'
            }
        }

        stage('Deployment') {
            steps {
                dir('build') {
                        sh 'docker-compose up'
                }
            }
        }
    }
}
