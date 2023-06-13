CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, notes)
VALUES (5, "Can't Stop the Feeling!", 'C4 C4 C4 C4 E4 E4 E4 E4 D4 D4 D4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, notes)
VALUES (2, 'Mary Had a Little Lamb', 'E4 D4 C4 D4 E4 E4 E4 D4 D4 D4 E4 G4 G4 E4 D4 C4 D4 E4 E4 E4 E4 D4 D4 E4 D4 C4');

INSERT INTO songs (id, song_title, notes) 
VALUES (3, 'Fly Me to the Moon', 'A3 A3 B3 C4 C4 B3 A3 G3 F3 F3 G3 A3 A3 G3 G3 B3 B3 C4 D4 E4 D4 C4 B3 A3 A3 G3 A3 B3 C4 B3 A3 G3 F3');
