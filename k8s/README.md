# Kubernetes Manifests

These manifests are a local-demo starting point for the Rail Event Monitor stack.

```bash
kubectl apply -f k8s/
kubectl -n rail-event-monitor port-forward svc/rem-frontend 4200:80
kubectl -n rail-event-monitor port-forward svc/rem-backend 18080:8080
kubectl -n rail-event-monitor port-forward svc/rem-rabbitmq 15672:15672
```

The included secret uses demo credentials only. Replace it with a managed secret
or sealed secret before deploying outside a local development cluster.
