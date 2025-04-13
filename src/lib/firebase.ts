import * as admin from "firebase-admin";
// TODO: login
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "my-scheduler-16652",
      clientEmail:
        "firebase-adminsdk-fbsvc@my-scheduler-16652.iam.gserviceaccount.com",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCb1QWlyjr2ts0U\nV5a8HpOAR0dg9VoxCRsREr2x7n6480MkVORbGFt0FCX87yj6pkDlrCKBUiS2J5d4\n3SWf0/wmOraNgyig204NmniQWXdmEM0oVtspErRc8aWgzHvzRljBTFwzwOwKd+Dj\nYGj5By7CfZx8sne8lYIcUMFNGJJZYFZUOTJQfxZYknEc3PVlZNp2FVlBjN71FcrG\nu0cvjkhDELN75HTF+k+NlkXVZ7D3QBQih91Ryp+oFlkaBj0PQxEz0UMDlvzaB1M0\nlWuTEk/UuLM7Bk85GIC+Io1bZWEEnKJTOUd2F/3Rfs4HADzMcTRkS9czcdaJoqW7\n2IIfppdzAgMBAAECggEAMd9i39URuuz1RInlwY4tmdP2KbdMZr4pzfSIBn60St/8\nAJA0x1zLxCJAqCsom9OCmJ7XKjlOa4fPSAzK4lSXceq/ixnLcnPNjrf91wDzIBTH\nfB4UJRiJ5ecmoYhgMRM2C6MzLRMU2CLWtB6iafTdB7zozNXXUWEuE37a5qAzEmwt\nQjOr3JHkvc2CCIy8PfdcO9KNpTRiB2I923ZiXL6l4Rg08loLQ7x4iTHQCdrxjKn7\nK3geehIjC72XkoUh6g9v0HxbzT6JIu8/vI0II06PhPdKaYF5fD5GWx6UkUygY1Uk\nklrUJWnuEHKAY2Tq/2MzP4ScWqw3J7YyOWOUETadZQKBgQDMtGF6lOwxFWzudUoQ\ntDRo7NpczFJl5HkGhrm88J9lSiT7ExXK96SUGhYZFxQs5fZL4FhaPLoRUjdnY0Ba\nY9UZccmLtu/WUvAaIhKfMQeMSqDSiGZoNKpV+aF7q0KQ96JWHQAuGiqSZi/Njgtq\nNAKankb60SdQfkvEmP0LUA2QzQKBgQDC4YOcOBIhyTTau8CBzvgKVonO8PQCRgmq\nWQ9/uSm4gdUoieuc463YVT7fo/s3w8pReiliuUX6JwTnqum9QhAkIAiBf0nhCxYX\nhCtjSP6N9sWEkxynIdLY64/Y8OOJxFmH2++B2H5mhr7MW22QmpDHqzrmwUcpxFx9\nEesygBvJPwKBgQC+k7ik/Pyf/ch6gKvBvWOFw+zPtFGKFxktoERPyN082bhwH6aM\nXd3VHCwyk6/u1PFmVqkq6Zp5Acge8uI4xPTiSXNQJbJIINL0IYCgwG68h8YN+3sL\nzOxAOrXCgwDoIgP6k+lVAntb7NLYVkP+TgmWlYCThiFJ6Sr1D1GWNKNMiQKBgQC6\nCld99vk4T8CpX7tzMIYSOHLun5AR65KmkMb/A2EUxr0bKi9HYwM/FoIjNYRJxBuM\nlLaVjJGFMWK5Vqw1BLAsDHiSR1XcBJ1ebcqNyc1Y8U+2NEqSMvP6KUb1r2FIz604\nyXln16kzb0cOB+octbGpK4nbaH/rG42/yC9j0nC0OQKBgC5thEVUGaF6g5T3eJh6\nFPiYt+9fnKSlOBj87Gnymtf9Lwp74DkXgBNkAvrtFRjVAMyIULM//Gl2ZoKgf9i7\nc+Y+SkbvyjW3Effv2ksHTxFWiEn9JvFZ22nCxv0bliI3DCEEvQy9hwQVe+uSMAOO\nm+vU+n5drdCbm9jB71cPkPkB\n-----END PRIVATE KEY-----\n".replace(
          /\\n/g,
          "\n"
        ),
    }),
  });
}

const db = admin.firestore();
export { admin, db };
