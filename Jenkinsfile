pipeline {
  agent any
  stages {
    stage('Build'){
    steps{
      script{
      sh 'npm install'
      }
    }
    }
    stage('Docker Image Build') {
      steps {
        script {
          sh 'docker-compose build'
        }

      }
    }
    stage('Docker push') {
      steps {
        script {
          withDockerRegistry([ credentialsId: "Dockerhub", url: "" ])
          {
            sh 'docker push bhanu201/db:latest'
            sh 'docker push bhanu201/redis:latest'
            sh 'docker push bhanu201/ipl:latest'
            
          }
        }

      }
    }
    stage('Deploy with Rundeck') {
      agent any
      steps {
        script {
          step([$class: "RundeckNotifier",
          rundeckInstance: "Rundeck",
          shouldFailTheBuild: true,
          shouldWaitForRundeckJob: true,
          options: """
            BUILD_VERSION=$BUILD_NUMBER
          """,
          jobId: "bb7cc1c3-6cee-4af0-8378-5c1089259753"])
        }
      }
    }
    stage('Test') {
      steps {
      
      script {
          sh 'selenium-side-runner --output-directory=./testing/results -c "browserName=chrome goog:chromeOptions.args=[headless]" --output-format=junit ./testing/devops.side'
      
       		}
       }
       }
     
  }
}
