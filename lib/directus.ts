import { createDirectus } from '@directus/sdk';
import { staticToken } from '@directus/sdk/auth';
import { rest } from '@directus/sdk/rest';
const client = createDirectus(process.env.NEXT_PUBLIC_API_URL!).with(staticToken(process.env.ACCESS_TOKEN!)).with(rest());
export default client;