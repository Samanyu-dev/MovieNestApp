//
//  TabData.swift
//  MovieNest
//
//  Created by Samanyu on 01/03/25.
//

import Foundation

enum Tab: CaseIterable {
    case home, tv, movies, more, profile

    var iconName: String {
        switch self {
        case .home: return "house.fill"
        case .tv: return "tv"
        case .movies: return "popcorn"
        case .more: return "text.line.first.and.arrowtriangle.forward"
        case .profile: return "person.crop.circle"
        }
    }
}
