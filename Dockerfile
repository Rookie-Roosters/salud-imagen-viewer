FROM node:20-alpine AS development-dependencies-env
# Install PNPM
RUN npm install -g pnpm
COPY . /app
WORKDIR /app
RUN pnpm install

FROM node:20-alpine AS production-dependencies-env
# Install PNPM
RUN npm install -g pnpm
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install

FROM node:20-alpine AS build-env
# Install PNPM
RUN npm install -g pnpm
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN pnpm run build

FROM node:20-alpine
# Install PNPM
RUN npm install -g pnpm
COPY ./package.json pnpm-lock.yaml /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
# Set PORT environment variable with default of 8080
ENV PORT=8080
# Expose the port
EXPOSE ${PORT}
# Start the application using the environment variable PORT
CMD ["sh", "-c", "pnpm run start"]