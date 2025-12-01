# LINKA Frontend
---
## Project Structure
```
linka-frontend/
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   └── logo
│       ├── logo-g.svg
│       └── logo-w.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── cases
│   │   │   │   ├── [id]
│   │   │   │   │   ├── matches
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── chat
│   │   │   │   └── route.ts
│   │   │   ├── fetchUser
│   │   │   │   └── route.ts
│   │   │   └── legal-consulation
│   │   │       └── route.ts
│   │   ├── cases
│   │   │   ├── [id]
│   │   │   │   ├── chat
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── legal-consultation
│   │   │   └── page.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── register
│   │       └── page.tsx
│   ├── components
│   │   ├── cases
│   │   │   ├── CaseCard.tsx
│   │   │   ├── MatchDetail.tsx
│   │   │   └── MatchList.tsx
│   │   ├── chat
│   │   │   ├── AICommands.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   └── MessageList.tsx
│   │   ├── legal-consulation
│   │   │   ├── LegalChatbot.tsx
│   │   │   └── SourceReference.tsx
│   │   ├── register
│   │   │   ├── AIQuestions.tsx
│   │   │   ├── BasicInfoForm.tsx
│   │   │   ├── EvidenceUpload.tsx
│   │   │   └── StatementEditor.tsx
│   │   └── ui
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── Modal.tsx
│   ├── lib
│   │   ├── api.ts
│   │   ├── utils.ts
│   │   └── websocket.ts
│   ├── store
│   │   ├── useAuthStore.ts
│   │   └── useStore.ts
│   └── types
│       ├── case.ts
│       ├── chat.ts
│       ├── legal-consulation.ts
│       └── user.ts
└── tsconfig.json
```
