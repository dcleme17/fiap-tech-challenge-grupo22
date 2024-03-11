- Deploy the Metrics Server with the following command:

    kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

- Verify that the metrics-server deployment is running the desired number of pods with the following command.

    kubectl get deployment metrics-server -n kube-system

Output

NAME             READY   UP-TO-DATE   AVAILABLE   AGE
metrics-server   1/1     1 