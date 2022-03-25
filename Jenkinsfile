def pomVersion
def pom
def artifactId
def releaseVersion
pipeline {
	agent any
	parameters {
	    booleanParam(name: 'DEPLOY_BUILD', defaultValue: false, description: 'Déploiement sur CLOE')
		booleanParam(name: 'REALEASE', defaultValue: false, description: 'Construction de release')
	    string(name: 'RELEASE_VERSION', defaultValue: '', description: 'Release version')
	    string(name: 'NEXT_VERSION', defaultValue: '', description: 'Next Version après release (ne pas mettre -SNAPSHOT)')
	}
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }
    stages {
		stage('Control params') {
            when {
            	expression { params.REALEASE == true && (params.RELEASE_VERSION == '' || params.NEXT_VERSION == '')}  
            }
            steps {
    			error('Merci de renseigner une version de realase et de prochaine snapshot')
			}	
        }
	    stage('Build') {
	          steps {
	                withMaven(maven: '3.5.0', mavenOpts: '-Xmx1024m -Xms512m', mavenSettingsConfig: 'apbSettings') {
	                      sh 'mvn clean package -P prod -DskipTests=true'
	                }
	          }
	    }

    	stage('Tests') {
	    	steps {
	            withMaven(maven: '3.5.0', mavenOpts: '-Xmx1024m -Xms512m', mavenSettingsConfig: 'apbSettings') {
	                // sh 'mvn test'
	            }
	        }
	    }

	    stage('SonarQube analysis') {
            when {
			    anyOf {
				    branch 'master'
				    branch 'develop'
				}
				expression { params.DEPLOY_BUILD == false }
        	}
	        steps {
	            withSonarQubeEnv('SonarQube') {
	                withMaven(maven: '3.5.0', mavenOpts: '-Xmx1024m -Xms512m', mavenSettingsConfig: 'apbSettings') {
	                    sh 'mvn sonar:sonar -Dsonar.projectKey=appli-blanche-quality-appli-blanche-frontend-$BRANCH_NAME'
	                }
	            }
	        }
	    }
		stage('Deploy Nexus'){
			agent { label 'docker' }
			when {
			    anyOf {
				    branch 'master'
				    branch 'develop'
				}
				expression { params.REALEASE == false }
        	}
			steps {
				script{
	                withMaven(maven: '3.5.0', jdk: 'jdk-11.0.6', mavenOpts: '-Xmx2048m -Xms512m', mavenSettingsConfig: 'apbSettings'
	                ) {
	                    sh 'mvn clean deploy -P prod -DskipTests';
	                }
                }
            }
		}
		stage('Release'){
			agent { label 'docker' }
			when {
				expression { params.REALEASE == true }
			}
			steps {
				sshagent(['tvandewalle']) {
					withMaven(maven: '3.5.0', jdk: 'jdk-11.0.6', mavenOpts: '-Xmx1024m -Xms512m', mavenSettingsConfig: 'apbSettings'){
						echo 'version de release =' + params.RELEASE_VERSION
                    	echo 'version de dev suivante =' + params.NEXT_VERSION
                    	script{
                    	 	releaseVersion = params.RELEASE_VERSION   
                    	}
                        sh 'mvn release:clean release:prepare release:perform --batch-mode -P prod -Dtag='+artifactId+'-'+ params.RELEASE_VERSION + ' -DreleaseVersion='+ params.RELEASE_VERSION + ' -DdevelopmentVersion='+ params.NEXT_VERSION + '-SNAPSHOT -DautoVersionSubmodules=true -DupdateWorkingCopyVersions=true -Darguments="-DskipTests"'
					}
				}
			}
		}

		stage('Deploy CLOE'){
			when {
				expression { params.DEPLOY_BUILD == true }
        	}
			steps {
				script{
	                echo "Start deploying CLOE!"
	                sshagent(['tvandewalle']) {
                    	pom = readMavenPom file: 'pom.xml'
                        pomVersion = pom.version
                        echo 'version pom=' + pomVersion
                        artifactId = pom.artifactId
                        echo 'ArtefactId=' + artifactId

	                    sh 'ssh -o StrictHostKeyChecking=no tvandewalle@10.242.252.145 sudo -s'
						echo 'release version ' + releaseVersion
						if (releaseVersion != null) {
							sh 'scp target/' + artifactId +'-' + releaseVersion + '.tar.gz tvandewalle@10.242.252.145:/home/tvandewalle'
						}
						else{
							sh 'scp target/' + artifactId +'-' + pomVersion + '.tar.gz tvandewalle@10.242.252.145:/home/tvandewalle'
						}

	                    try{
							sh 'ssh -o StrictHostKeyChecking=no tvandewalle@10.242.252.145 sudo -s rm -r /var/www/html/appli-blanche-frontend/*'
						}
						catch (exc) {
                                echo 'Rien à supprimer'
                        }
						sh 'ssh -o StrictHostKeyChecking=no tvandewalle@10.242.252.145 sudo -s tar -xzvf ' + artifactId +'-' + pomVersion + '.tar.gz -C /var/www/html/appli-blanche-frontend'
	                    sh 'ssh -o StrictHostKeyChecking=no tvandewalle@10.242.252.145 sudo -s rm ' + artifactId +'-' + pomVersion + '.tar.gz'
						sh 'ssh -o StrictHostKeyChecking=no tvandewalle@10.242.252.145 sudo -s systemctl restart httpd.service'
	                }
                }
            }
		}
    }
    environment {
        EMAIL_TO = 'appli-blanche@ac-toulouse.fr'
    }

   	post {
        failure {
            emailext body: 'Check console output at $BUILD_URL to view the results. \n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}',
                    to: "${EMAIL_TO}",
                    subject: 'Build failed in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
        }
        unstable {
            emailext body: 'Check console output at $BUILD_URL to view the results. \n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}',
                    to: "${EMAIL_TO}",
                    subject: 'Unstable build in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
        }
        changed {
            emailext body: 'Check console output at $BUILD_URL to view the results.',
                    to: "${EMAIL_TO}",
                    subject: 'Jenkins build is back to normal: $PROJECT_NAME - #$BUILD_NUMBER'
        }
    }
}
