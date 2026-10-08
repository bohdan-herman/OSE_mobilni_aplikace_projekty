# Architektura

Aplikace je postavená na **Expo (React Native) + TypeScript**. Stav spravuje **Zustand**
a ukládá se do zařízení přes **AsyncStorage** (middleware `persist`).

## Struktura

```
App.tsx                      # kořenová obrazovka — skládá komponenty dohromady
src/
  features/todos/
    model/                   # typ Todo, validace názvu (čisté funkce, bez Reactu)
    store/                   # useTodoStore — stav + akce add / toggle / delete + persist
    components/              # TodoInput, TodoList, TodoItem, EmptyState
  theme/                     # barvy, typografie, rozestupy (vlastní vzhled)
docs/                        # dokumentace
e2e/                         # Maestro E2E scénáře
```

## Tok dat

```
Komponenta ──(akce: addTodo / toggleTodo / deleteTodo)──▶ useTodoStore ──persist──▶ AsyncStorage
     ▲                                                         │
     └──────────────(selektor: s => s.todos)───────────────────┘
```

- Komponenty čtou stav přes selektory, takže se překreslí jen při změně dat, která používají.
- Veškerá pravidla (např. „prázdný úkol nelze přidat“) jsou v `model/` a ve store,
  ne v UI — dají se tedy testovat bez renderování.

## Testování na počítači

| Úroveň                | Nástroj                                       | Příkaz                                 |
| --------------------- | --------------------------------------------- | -------------------------------------- |
| Typy                  | TypeScript                                    | `npm run typecheck`                    |
| Lint / formát         | ESLint, Prettier                              | `npm run lint`, `npm run format:check` |
| Logika + komponenty   | Jest, jest-expo, React Native Testing Library | `npm test`                             |
| Spuštění v prohlížeči | react-native-web                              | `npm run web`                          |
| Android emulátor      | Android Studio                                | `npm run android`                      |
| E2E                   | Maestro                                       | `maestro test e2e/`                    |

Vše najednou: `npm run check`.
