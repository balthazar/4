FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY src/ ./src/
COPY bin/ ./bin/
COPY webpack/ ./webpack/

RUN npm run build

# ---

FROM node:20-alpine AS runner

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --from=builder /app/dist/ ./dist/
COPY bin/ ./bin/
COPY src/ ./src/

EXPOSE 3000

RUN addgroup -S app && adduser -S app -G app
USER app

CMD ["node", "bin/start"]
