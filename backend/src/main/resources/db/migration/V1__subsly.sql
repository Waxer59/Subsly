CREATE SEQUENCE IF NOT EXISTS user_config_entity_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE user_config_entity
(
    id       BIGINT NOT NULL,
    currency SMALLINT,
    user_id  BIGINT,
    CONSTRAINT pk_userconfigentity PRIMARY KEY (id)
);

CREATE TABLE users_entity_subscriptions
(
    users_entity_id  BIGINT NOT NULL,
    subscriptions_id BIGINT NOT NULL
);

ALTER TABLE subscriptions_entity
    ADD amount FLOAT;

ALTER TABLE subscriptions_entity
    ADD name VARCHAR(255);

ALTER TABLE subscriptions_entity
    ADD renews_every INTEGER;

ALTER TABLE subscriptions_entity
    ADD service_url VARCHAR(255);

ALTER TABLE subscriptions_entity
    ADD user_id BIGINT;

ALTER TABLE subscriptions_entity
    ALTER COLUMN amount SET NOT NULL;

ALTER TABLE subscriptions_entity
    ALTER COLUMN name SET NOT NULL;

ALTER TABLE subscriptions_entity
    ALTER COLUMN renews_every SET NOT NULL;

ALTER TABLE subscriptions_entity
    ALTER COLUMN service_url SET NOT NULL;

ALTER TABLE users_entity
    ADD user_config_id BIGINT;

ALTER TABLE users_entity_subscriptions
    ADD CONSTRAINT uc_users_entity_subscriptions_subscriptions UNIQUE (subscriptions_id);

ALTER TABLE users_entity
    ADD CONSTRAINT uc_usersentity_email UNIQUE (email);

ALTER TABLE users_entity
    ADD CONSTRAINT uc_usersentity_githubid UNIQUE (github_id);

ALTER TABLE users_entity
    ADD CONSTRAINT uc_usersentity_googleid UNIQUE (google_id);

ALTER TABLE subscriptions_entity
    ADD CONSTRAINT FK_SUBSCRIPTIONSENTITY_ON_USER FOREIGN KEY (user_id) REFERENCES users_entity (id);

ALTER TABLE user_config_entity
    ADD CONSTRAINT FK_USERCONFIGENTITY_ON_USER FOREIGN KEY (user_id) REFERENCES users_entity (id);

ALTER TABLE users_entity
    ADD CONSTRAINT FK_USERSENTITY_ON_USERCONFIG FOREIGN KEY (user_config_id) REFERENCES user_config_entity (id);

ALTER TABLE users_entity_subscriptions
    ADD CONSTRAINT fk_useentsub_on_subscriptions_entity FOREIGN KEY (subscriptions_id) REFERENCES subscriptions_entity (id);

ALTER TABLE users_entity_subscriptions
    ADD CONSTRAINT fk_useentsub_on_users_entity FOREIGN KEY (users_entity_id) REFERENCES users_entity (id);

ALTER TABLE users_entity
    ALTER COLUMN email SET NOT NULL;

ALTER TABLE users_entity
    ALTER COLUMN profile_picture SET NOT NULL;

ALTER TABLE users_entity
    ALTER COLUMN username SET NOT NULL;