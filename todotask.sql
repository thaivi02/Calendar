USE [TodoApp]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 16/07/2024 12:04:37 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 16/07/2024 12:04:37 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 16/07/2024 12:04:37 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 16/07/2024 12:04:37 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 16/07/2024 12:04:37 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 16/07/2024 12:04:37 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[FullName] [nvarchar](100) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 16/07/2024 12:04:37 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Priority]    Script Date: 16/07/2024 12:04:37 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Priority](
	[PriorityId] [int] NOT NULL,
	[PriorityName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Priority] PRIMARY KEY CLUSTERED 
(
	[PriorityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TodoTask]    Script Date: 16/07/2024 12:04:37 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TodoTask](
	[TaskId] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](50) NOT NULL,
	[PriorityId] [int] NOT NULL,
	[Date] [date] NOT NULL,
	[StartTime] [time](0) NOT NULL,
	[EndTime] [time](0) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED 
(
	[TaskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'16eac658-4b36-404b-8100-87f813ecc793', N'User', N'USER', N'8db0c324-979f-4fc1-b570-a7d9ba3c7812')
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'67a0f42f-97d6-4e91-826b-9d476026a4b1', N'16eac658-4b36-404b-8100-87f813ecc793')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'dac31550-298f-44bd-b165-88a04e487b3c', N'16eac658-4b36-404b-8100-87f813ecc793')
GO
INSERT [dbo].[AspNetUsers] ([Id], [FullName], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'67a0f42f-97d6-4e91-826b-9d476026a4b1', N'Nguyễn Việt Thái', N'thaipro', N'THAIPRO', NULL, NULL, 0, N'AQAAAAEAACcQAAAAEPPqaYnarsnfpORsQVNntaf6P/zzzfHSnKJMMRVIkNVT0huZ+3sRloa9zXiKKJ608A==', N'VGXSS23FLNKEPASEJ6WPVO73VGUUQNT4', N'1a322bff-f581-4b74-a310-e869d89f3eeb', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [FullName], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'dac31550-298f-44bd-b165-88a04e487b3c', N'Thai Nguyen', N'thainguyen', N'THAINGUYEN', NULL, NULL, 0, N'AQAAAAEAACcQAAAAECS/kGB5hez+lB+LLh+CyYwrUYobEsWE00/DMg0euJ3jOb16Kc7036/Xb7OrqNboVQ==', N'O42UW5QIYAYXVQSZMDNSBZQQ7PEOMLVP', N'6c5264ad-7154-4064-bf7e-9b6172beeafe', NULL, 0, 0, NULL, 1, 0)
GO
INSERT [dbo].[Priority] ([PriorityId], [PriorityName]) VALUES (1, N'warning')
INSERT [dbo].[Priority] ([PriorityId], [PriorityName]) VALUES (2, N'success')
INSERT [dbo].[Priority] ([PriorityId], [PriorityName]) VALUES (3, N'error')
GO
SET IDENTITY_INSERT [dbo].[TodoTask] ON 

INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1014, N'test1', N'test', 2, CAST(N'2024-07-02' AS Date), CAST(N'10:00:00' AS Time), CAST(N'11:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1016, N'test 3', N'string', 1, CAST(N'2024-06-21' AS Date), CAST(N'10:00:00' AS Time), CAST(N'12:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1017, N'test 313', N'string', 1, CAST(N'2024-06-21' AS Date), CAST(N'10:00:00' AS Time), CAST(N'12:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1018, N'test thainguyen', N'string', 1, CAST(N'2024-06-21' AS Date), CAST(N'10:00:00' AS Time), CAST(N'12:00:00' AS Time), N'dac31550-298f-44bd-b165-88a04e487b3c')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1021, N'code', N'string', 1, CAST(N'2024-07-03' AS Date), CAST(N'10:00:00' AS Time), CAST(N'12:00:00' AS Time), N'dac31550-298f-44bd-b165-88a04e487b3c')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1022, N'code', N'coding', 2, CAST(N'2024-07-03' AS Date), CAST(N'10:00:00' AS Time), CAST(N'22:00:00' AS Time), N'dac31550-298f-44bd-b165-88a04e487b3c')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1023, N'test bla', N'string', 2, CAST(N'2024-06-21' AS Date), CAST(N'10:00:00' AS Time), CAST(N'12:00:00' AS Time), N'dac31550-298f-44bd-b165-88a04e487b3c')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1024, N'test 3', N'string', 1, CAST(N'2024-06-21' AS Date), CAST(N'10:00:00' AS Time), CAST(N'12:00:00' AS Time), N'dac31550-298f-44bd-b165-88a04e487b3c')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1025, N'Code Task List Page 1', N'Codeee', 1, CAST(N'2024-07-04' AS Date), CAST(N'07:00:00' AS Time), CAST(N'19:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1026, N'test', N'rerw', 1, CAST(N'2024-07-03' AS Date), CAST(N'04:00:00' AS Time), CAST(N'08:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1028, N'test put', N'qwe', 3, CAST(N'2024-07-03' AS Date), CAST(N'02:00:00' AS Time), CAST(N'04:00:00' AS Time), N'dac31550-298f-44bd-b165-88a04e487b3c')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1029, N'test 2', N'we', 2, CAST(N'2024-07-01' AS Date), CAST(N'03:00:00' AS Time), CAST(N'07:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1031, N'ok', N'dae', 2, CAST(N'2024-07-07' AS Date), CAST(N'03:00:00' AS Time), CAST(N'03:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1032, N'abcd', N'jkhkh', 3, CAST(N'2024-07-06' AS Date), CAST(N'02:00:00' AS Time), CAST(N'18:09:09' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1033, N'Guitar', N'test', 3, CAST(N'2024-07-06' AS Date), CAST(N'02:00:00' AS Time), CAST(N'04:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1034, N'Add Odata to project', N'add odata', 3, CAST(N'2024-07-07' AS Date), CAST(N'14:10:00' AS Time), CAST(N'23:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1035, N'Quét nhà', N'lao động', 2, CAST(N'2024-07-07' AS Date), CAST(N'08:00:00' AS Time), CAST(N'08:10:00' AS Time), N'dac31550-298f-44bd-b165-88a04e487b3c')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1036, N'Learn play Piano', N'Learn', 2, CAST(N'2024-07-12' AS Date), CAST(N'14:00:00' AS Time), CAST(N'16:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1037, N'Go to school', N'go to school', 3, CAST(N'2024-07-12' AS Date), CAST(N'09:30:00' AS Time), CAST(N'15:00:00' AS Time), N'dac31550-298f-44bd-b165-88a04e487b3c')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1038, N'test', N'123', 1, CAST(N'2024-07-12' AS Date), CAST(N'02:00:00' AS Time), CAST(N'03:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1039, N'test 1 ', N'qwe', 2, CAST(N'2024-07-12' AS Date), CAST(N'05:00:00' AS Time), CAST(N'08:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1040, N'test 2', N'123', 3, CAST(N'2024-07-12' AS Date), CAST(N'02:00:00' AS Time), CAST(N'12:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1041, N'Học English', N'practice 123', 3, CAST(N'2024-07-15' AS Date), CAST(N'07:00:00' AS Time), CAST(N'15:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
INSERT [dbo].[TodoTask] ([TaskId], [Title], [Description], [PriorityId], [Date], [StartTime], [EndTime], [UserId]) VALUES (1042, N'Mạnh', N'123123', 3, CAST(N'2024-07-15' AS Date), CAST(N'08:00:00' AS Time), CAST(N'11:00:00' AS Time), N'67a0f42f-97d6-4e91-826b-9d476026a4b1')
SET IDENTITY_INSERT [dbo].[TodoTask] OFF
GO
ALTER TABLE [dbo].[TodoTask] ADD  DEFAULT (N'') FOR [UserId]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[TodoTask]  WITH CHECK ADD  CONSTRAINT [FK_TodoTask_Priority] FOREIGN KEY([PriorityId])
REFERENCES [dbo].[Priority] ([PriorityId])
GO
ALTER TABLE [dbo].[TodoTask] CHECK CONSTRAINT [FK_TodoTask_Priority]
GO
ALTER TABLE [dbo].[TodoTask]  WITH CHECK ADD  CONSTRAINT [FK_TodoTask_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[TodoTask] CHECK CONSTRAINT [FK_TodoTask_User]
GO
