# TODO list

Mobilní aplikace pro správu úkolů — **Expo (React Native) + TypeScript + Zustand**.

## Funkce

- přidání úkolu (prázdný ani jen z mezer nejde přidat — tlačítko je neaktivní)
- seznam úkolů s počítadlem „Hotovo X z Y“ a progress barem
- označení úkolu jako hotový (a zpět)
- smazání úkolu
- vlastní vzhled: světlý i tmavý režim podle systému, karty, animace
- úkoly se ukládají do zařízení (AsyncStorage) a zůstanou i po restartu

Architektura je popsaná v [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Spuštění

Požadavky: Node.js 20+.

```bash
npm install
npm start          # Expo dev server — QR kód pro Expo Go na telefonu
npm run web        # v prohlížeči
npm run android    # Android emulátor (Android Studio) nebo připojený telefon
```

### Spuštění na telefonu (Expo Go)

1. Nainstaluj aplikaci **Expo Go** (Google Play / App Store).
2. Připoj telefon i počítač ke **stejné Wi-Fi** a spusť `npm start`.
3. Naskenuj QR kód z terminálu (Android: v Expo Go, iPhone: fotoaparátem).

**Síť s izolací zařízení** (např. eduroam, firemní nebo hotelová Wi-Fi): telefon počítač nevidí
a Expo Go zůstane na modré obrazovce. V tom případě spusť server přes tunel:

```bash
npx expo start --tunnel
```

Při prvním spuštění Expo nabídne instalaci balíčku `@expo/ngrok` — potvrď `Y`.
Alternativa bez tunelu: sdílet internet z telefonu (hotspot) a připojit k němu počítač.

## Testování na počítači

| Příkaz                  | Co dělá                                                        |
| ----------------------- | -------------------------------------------------------------- |
| `npm test`              | unit + komponentové testy (Jest, React Native Testing Library) |
| `npm run test:coverage` | totéž s pokrytím kódu (`coverage/`)                            |
| `npm run typecheck`     | kontrola typů TypeScript                                       |
| `npm run lint`          | ESLint                                                         |
| `npm run format:check`  | Prettier                                                       |
| `npm run check`         | vše výše najednou                                              |

### E2E testy (Maestro)

Scénáře jsou ve složce [`e2e/`](e2e/) a běží proti aplikaci v **Expo Go na Android emulátoru**.

1. Nainstaluj [Android Studio](https://developer.android.com/studio) a vytvoř emulátor.
2. Nainstaluj [Maestro CLI](https://docs.maestro.dev/getting-started/installing-maestro) (na Windows přes WSL nebo podle návodu pro Windows).
3. Spusť emulátor a `npm run android` (nainstaluje Expo Go a otevře aplikaci).
4. V druhém terminálu:

```bash
maestro test e2e/
```

Pokud aplikace běží na jiné adrese: `maestro test -e APP_URL=exp://192.168.0.10:8081 e2e/`.

## Struktura

```
App.tsx                      # obrazovka
src/features/todos/
  model/                     # typ Todo, validace
  store/                     # Zustand store + persist
  components/                # TodoHeader, TodoSummary, TodoInput, TodoList, TodoItem, EmptyState
  __tests__/                 # testy
src/theme/                   # barvy (light/dark), rozestupy, typografie
e2e/                         # Maestro scénáře
```
