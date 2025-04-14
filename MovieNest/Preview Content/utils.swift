//
//  utils.swift
//  MovieNest
//
//  Created by Samanyu on 26/02/25.
//

import UIKit
import SwiftUI
import Foundation

struct RoundedCorner: Shape {
    var radius: CGFloat = .infinity
    var corners: UIRectCorner = .allCorners
    
    func path(in rect: CGRect) -> Path {
        let path = UIBezierPath(roundedRect: rect, byRoundingCorners: corners, cornerRadii: CGSize(width: radius, height: radius))
        return Path(path.cgPath)
    }
}

extension View {
    func cornerRadius(_ radius: CGFloat, corners: UIRectCorner) -> some View {
        clipShape( RoundedCorner(radius: radius, corners: corners) )
    }
    
    func glow( color: Color = .red, radius: CGFloat = 20) -> some View {
        self
            .shadow(color: color, radius: radius/3)
            .shadow(color: color, radius: radius/3)
            .shadow(color: color, radius: radius/3)
    }
}

struct Line: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.width, y: 0))
        return path
    }
}

